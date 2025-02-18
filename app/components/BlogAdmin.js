"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Code as CodeIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Note as NoteIcon
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown"; // Import react-markdown

// TabPanel component for tab content
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tutorial-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TutorialAdmin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    leftMenu: "",
    slug: "",
    category: "",
    status: "draft",
    content: [],
    seo: {
      title: "",
      description: "",
      keywords: "",
      ogImage: "",
    },
    tags: "",
    featuredImage: null,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImageUpload = async (file, type = "content") => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const addSection = (type) => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { type, content: "" }],
    }));
  };

  const updateSection = async (index, content, file = null) => {
    const newContent = [...formData.content];

    if (file && newContent[index].type === "image") {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        newContent[index].imageUrl = imageUrl;
      }
    } else {
      newContent[index].content = content;
    }

    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const tutorialData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags string to array
    };

    try {
      const response = await fetch("/api/tutorials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutorialData),
      });

      if (response.ok) {
        alert("Tutorial saved successfully!");
        // Optionally, reset the form after successful submission
        setFormData({
          title: "",
          leftMenu: "",
          slug: "",
          category: "",
          status: "draft",
          content: [],
          seo: {
            title: "",
            description: "",
            keywords: "",
            ogImage: "",
          },
          tags: "",
          featuredImage: null,
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving tutorial:", error);
      alert("An error occurred while saving the tutorial.");
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Edit" />
          <Tab label="Preview" />
          <Tab label="SEO" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardHeader title="Create Tutorial" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Existing fields (title, slug, etc.) */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tutorial Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Left Menu Name"
                    value={formData.leftMenu}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        leftMenu: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="javascript">JavaScript</MenuItem>
                      <MenuItem value="react">React</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      label="Status"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>Content Sections</Divider>
                  {formData.content.map((section, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      {section.type === "image" ? (
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              updateSection(index, "", e.target.files[0])
                            }
                            style={{ marginBottom: 16 }}
                          />
                          {section.imageUrl && (
                            <img
                              src={section.imageUrl}
                              alt="Uploaded content"
                              style={{ maxHeight: 200, objectFit: "contain" }}
                            />
                          )}
                        </Paper>
                      ) : (
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          value={section.content}
                          onChange={(e) => updateSection(index, e.target.value)}
                          helperText="Use Markdown for formatting: **bold**, *italic*, - lists, etc."
                          sx={
                            section.type === "code"
                              ? { fontFamily: "monospace" }
                              : {}
                          }
                        />
                      )}
                      <IconButton
                        color="error"
                        onClick={() => {
                          const newContent = [...formData.content];
                          newContent.splice(index, 1);
                          setFormData((prev) => ({
                            ...prev,
                            content: newContent,
                          }));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => addSection("text")}
                    >
                      Add Text
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CodeIcon />}
                      onClick={() => addSection("code")}
                    >
                      Add Code
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<ImageIcon />}
                      onClick={() => addSection("image")}
                    >
                      Add Image
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<NoteIcon />}
                      onClick={() => addSection("note")}
                    >
                      Add Note
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    startIcon={<SaveIcon />}
                  >
                    Save Tutorial
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {formData.title}
            </Typography>
            {formData.content.map((section, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                {section.type === "image" ? (
                  <img
                    src={section.imageUrl}
                    alt="Tutorial content"
                    style={{ maxWidth: "100%", marginBottom: 16 }}
                  />
                ) : section.type === "code" ? (
                  <Paper
                    sx={{
                      bgcolor: "grey.900",
                      color: "common.white",
                      p: 2,
                      mb: 2,
                      fontFamily: "monospace",
                    }}
                  >
                    <pre style={{ margin: 0 }}>{section.content}</pre>
                  </Paper>
                ) : (
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default TutorialAdmin;
