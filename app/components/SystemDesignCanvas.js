"use client";
import "@excalidraw/excalidraw/index.css";
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for Excalidraw to avoid SSR issues
const Excalidraw = dynamic(
    () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
    { ssr: false }
);

const SystemDesignCanvas = forwardRef(({ activeChallenge, onFeedback }, ref) => {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    // Initial Data or Template
    useEffect(() => {
        if (!excalidrawAPI) return;

        // Force Unlock and Grid Mode
        // We do this in a slight timeout to ensure it applies after internal init
        const timer = setTimeout(() => {
            excalidrawAPI.updateScene({
                appState: {
                    viewModeEnabled: false,
                    zenModeEnabled: false,
                    gridModeEnabled: true,
                    viewBackgroundColor: "#fafafa"
                }
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [excalidrawAPI]);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
        reset: () => {
            if (excalidrawAPI) {
                excalidrawAPI.resetScene();
                // Re-apply unlock just in case
                excalidrawAPI.updateScene({ appState: { viewModeEnabled: false } });
            }
        },
        getSceneElements: () => {
            if (!excalidrawAPI) return [];
            return excalidrawAPI.getSceneElements();
        },
        addToScene: (type, label, color, dropX, dropY) => {
            if (!excalidrawAPI) return;
            const elements = excalidrawAPI.getSceneElements();
            const appState = excalidrawAPI.getAppState();
            const currentZoom = appState.zoom?.value || 1;
            const scrollX = appState.scrollX || 0;
            const scrollY = appState.scrollY || 0;
            const width = appState.width || 800; // fallback
            const height = appState.height || 600; // fallback

            let finalX, finalY;

            if (dropX !== undefined && dropY !== undefined) {
                // Calculate scene coordinates from client drop
                finalX = (dropX / currentZoom) - scrollX;
                finalY = (dropY / currentZoom) - scrollY;
            } else {
                // Center fallback
                finalX = (width / 2 / currentZoom) - scrollX - 60;
                finalY = (height / 2 / currentZoom) - scrollY - 30;
            }

            const newElement = {
                type: "rectangle",
                x: finalX,
                y: finalY,
                width: 140,
                height: 60,
                backgroundColor: "transparent",
                strokeColor: color || "#000000",
                strokeStyle: "solid",
                strokeWidth: 2,
                fillStyle: "hachure",
                roughness: 1,
                opacity: 100,
                groupIds: [],
                roundness: { type: 3 }, // rounded
                seed: Math.random() * 100000,
                version: 1,
                versionNonce: Math.random() * 100000,
                isDeleted: false,
                boundElements: null,
                updated: Date.now(),
                link: null,
                locked: false,
                label: { text: label }
            };

            const textId = `text-${Date.now()}`;
            const rectId = `rect-${Date.now()}`;

            const rect = {
                ...newElement,
                id: rectId,
                boundElements: [{ id: textId, type: "text" }]
            };

            const text = {
                type: "text",
                id: textId,
                x: finalX + 10,
                y: finalY + 20,
                width: 120,
                height: 20,
                fontFamily: 1,
                fontSize: 16,
                textAlign: "center",
                verticalAlign: "middle",
                baseline: 15,
                text: label,
                originalText: label,
                strokeColor: color || "#000000",
                containerId: rectId,
                seed: Math.random() * 100000,
            };

            excalidrawAPI.updateScene({
                elements: [...elements, rect, text]
            });
        },
        autoSolve: (items, connections) => {
            if (!excalidrawAPI) return;

            // Convert items items [{id, type, x, y}] to Excalidraw Elements
            const newElements = [];
            const idMap = {}; // internal ID -> Excalidraw ID

            // 1. Create Nodes
            items.forEach(item => {
                const rectId = item.id;
                const textId = item.id + '-text';

                // Color mapping
                let stroke = "#000000";
                if (item.type === 'db') stroke = "#f97316"; // orange
                if (item.type === 'client') stroke = "#3b82f6"; // blue
                if (item.type === 'server') stroke = "#22c55e"; // green
                if (item.type === 'lb') stroke = "#a855f7"; // purple
                if (item.type === 'cache') stroke = "#ef4444"; // red

                const rect = {
                    id: rectId,
                    type: "rectangle",
                    x: item.x + 200, // Offset for canvas
                    y: item.y,
                    width: 120,
                    height: 80,
                    backgroundColor: "transparent",
                    strokeColor: stroke,
                    strokeStyle: "solid",
                    strokeWidth: 2,
                    fillStyle: "solid", // solid looks cleaner
                    roughness: 0, // Cleaner for "Auto Solve"
                    roundness: { type: 3 },
                    boundElements: [{ id: textId, type: "text" }]
                };

                // Label Mapping
                let labelText = item.id;
                // ... same logic
                labelText = `${item.type.toUpperCase()}\n(${item.id})`;

                const text = {
                    id: textId,
                    type: "text",
                    x: item.x + 210,
                    y: item.y + 30,
                    text: labelText,
                    fontSize: 14,
                    fontFamily: 1,
                    textAlign: "center",
                    verticalAlign: "middle",
                    containerId: rectId,
                    strokeColor: stroke
                };

                newElements.push(rect, text);
            });

            // 2. Create Connections
            connections.forEach((conn, i) => {
                const arrow = {
                    id: `arrow-${i}`,
                    type: "arrow",
                    x: 0,
                    y: 0,
                    strokeColor: "#94a3b8", // gray-400
                    strokeWidth: 1,
                    startBinding: { elementId: conn.from, focus: 0, gap: 1 },
                    endBinding: { elementId: conn.to, focus: 0, gap: 1 },
                    startArrowhead: null,
                    endArrowhead: "arrow",
                    points: [[0, 0], [100, 100]], // Dummy points
                };
                newElements.push(arrow);
            });


            excalidrawAPI.updateScene({
                elements: newElements,
                appState: { viewBackgroundColor: "#ffffff", scrollX: 0, scrollY: 0 },
                commitToHistory: true
            });

            // Zoom to fit
            excalidrawAPI.scrollToContent(newElements, { fitToViewport: true });
        }
    }));

    return (
        <div className="w-full h-full border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm relative">
            <Excalidraw
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                viewModeEnabled={false}
                zenModeEnabled={false}
                gridModeEnabled={true}
                // Removed initialData viewMode to allow defaults to take over if needed, 
                // but useEffect will force it anyway.
                initialData={{
                    appState: {
                        viewBackgroundColor: "#fafafa",
                        currentItemStrokeColor: "#000000",
                        gridModeEnabled: true,
                    }
                }}
                UIOptions={{
                    canvasActions: {
                        toggleTheme: false,
                        loadScene: false,
                        saveToActiveFile: false,
                        export: { saveFileToDisk: false },
                        saveAsImage: true,
                        changeViewBackgroundColor: true,
                        clearCanvas: true,
                    }
                }}
            />
        </div>
    );
});

SystemDesignCanvas.displayName = "SystemDesignCanvas";
export default SystemDesignCanvas;
