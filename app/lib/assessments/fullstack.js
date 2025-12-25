export const fullstackAssessment = {
    id: "fullstack-certification",
    title: "Fullstack Certification",
    description: "Prove you can build the whole stack: Node.js, Databases, API Design, and System Architecture.",
    questions: [
        {
            id: "fs-1",
            question: "What is the Event Loop in Node.js?",
            options: [
                "A loop that runs every second",
                "The mechanism that allows Node.js to perform non-blocking I/O operations despite being single-threaded",
                "A database query loop",
                "A frontend framework"
            ],
            correctAnswer: 1,
            explanation: "The Event Loop is what allows Node.js to handle many connections concurrently. It offloads I/O operations to the system kernel whenever possible."
        },
        {
            id: "fs-2",
            question: "What is the difference between SQL and NoSQL?",
            options: [
                "SQL is faster",
                "SQL is relational and table-based; NoSQL is non-relational and document/key-value based",
                "NoSQL is deprecated",
                "SQL uses JSON"
            ],
            correctAnswer: 1,
            explanation: "SQL databases are relational, table-based databases. NoSQL databases are non-relational and can be document-based, key-value pairs, graph databases, or wide-column stores."
        },
        {
            id: "fs-3",
            question: "What is a JWT (JSON Web Token)?",
            options: [
                "A database",
                "A compact, URL-safe means of representing claims to be transferred between two parties",
                "A type of cookie",
                "A password hash"
            ],
            correctAnswer: 1,
            explanation: "JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object."
        },
        {
            id: "fs-4",
            question: "Why should you salt a password before hashing it?",
            options: [
                "To make it taste better",
                "To defend against rainbow table attacks by ensuring unique hashes for the same password",
                "To compress the password",
                "To encrypt it"
            ],
            correctAnswer: 1,
            explanation: "A salt is random data that is used as an additional input to a one-way function that hashes data. It prevents attackers from using pre-computed tables (rainbow tables) to crack passwords."
        },
        {
            id: "fs-5",
            question: "What is the N+1 problem in GraphQL/ORMs?",
            options: [
                "A math error",
                "When the application makes one query for the parent records and then N queries for the child records",
                "A variable naming convention",
                "A connection limit"
            ],
            correctAnswer: 1,
            explanation: "The N+1 problem occurs when data fetching is executed in a loop. For example, fetching a list of 10 users (1 query) and then fetching their posts for each user (10 queries) = 11 queries."
        },
        {
            id: "fs-6",
            question: "What is the CAP Theorem?",
            options: [
                "Consistency, Availability, Partition Tolerance - pick two",
                "Create, Add, Push",
                "A theorem about capital letters",
                "Consistency, Accuracy, Performance"
            ],
            correctAnswer: 0,
            explanation: "The CAP theorem states that a distributed data store can only provide two of the following three guarantees: Consistency, Availability, and Partition Tolerance."
        },
        {
            id: "fs-7",
            question: "What is Horizontal Scaling?",
            options: [
                "Adding more power (CPU/RAM) to an existing machine",
                "Adding more machines to the pool of resources",
                "Making the screen wider",
                "Optimizing code"
            ],
            correctAnswer: 1,
            explanation: "Horizontal scaling (scaling out) means adding more nodes to a system, such as adding a new computer to a distributed software application."
        },
        {
            id: "fs-8",
            question: "What is Middleware in Express.js?",
            options: [
                "Software between the OS and the App",
                "Functions that have access to the request object, the response object, and the next middleware function",
                "A database driver",
                "A frontend library"
            ],
            correctAnswer: 1,
            explanation: "Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle."
        },
        {
            id: "fs-9",
            question: "What is the difference between PUT and PATCH?",
            options: [
                "PUT creates, PATCH updates",
                "PUT replaces the entire resource; PATCH applies a partial update",
                "They are the same",
                "PATCH is deprecated"
            ],
            correctAnswer: 1,
            explanation: "PUT is idempotent and replaces the target resource with the request payload. PATCH applies partial modifications to a resource."
        },
        {
            id: "fs-10",
            question: "What is a Reverse Proxy?",
            options: [
                "A proxy that hides the client",
                "A server that sits in front of web servers and forwards client requests to those web servers",
                "A VPN",
                "A database cache"
            ],
            correctAnswer: 1,
            explanation: "A reverse proxy is a type of proxy server that retrieves resources on behalf of a client from one or more servers. It is often used for load balancing, security, and caching."
        },
        {
            id: "fs-11",
            question: "Why is `localStorage` generally unsafe for storing auth tokens?",
            options: [
                "It has a small size limit",
                "It is accessible to any JavaScript running on the page (XSS vulnerability)",
                "It is slow",
                "It expires when the browser closes"
            ],
            correctAnswer: 1,
            explanation: "If an attacker can run JavaScript on your page (XSS), they can read `localStorage` and steal the token. HttpOnly cookies are safer because they cannot be accessed by JavaScript."
        },
        {
            id: "fs-12",
            question: "What is CORS?",
            options: [
                "Cross-Origin Resource Sharing",
                "Create Object Read Save",
                "Computer Online Resource System",
                "A beer brand"
            ],
            correctAnswer: 0,
            explanation: "CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin."
        },
        {
            id: "fs-13",
            question: "What is an ORM (Object-Relational Mapping)?",
            options: [
                "A database",
                "A technique for converting data between incompatible type systems (e.g., Objects in code vs Tables in DB)",
                "A routing library",
                "A testing tool"
            ],
            correctAnswer: 1,
            explanation: "ORM libraries (like Prisma, TypeORM, Sequelize) let you interact with your database using objects in your preferred programming language instead of writing raw SQL."
        },
        {
            id: "fs-14",
            question: "What is the purpose of a Load Balancer?",
            options: [
                "To weigh the servers",
                "To distribute network or application traffic across a number of servers",
                "To balance the budget",
                "To compress images"
            ],
            correctAnswer: 1,
            explanation: "A load balancer acts as the 'traffic cop' sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests."
        },
        {
            id: "fs-15",
            question: "What is the difference between `process.nextTick` and `setImmediate`?",
            options: [
                "`setImmediate` runs first",
                "`process.nextTick` fires immediately on the same phase (microtask); `setImmediate` fires on the following iteration or 'tick' of the event loop (check phase)",
                "They are the same",
                "`process.nextTick` is for browsers"
            ],
            correctAnswer: 1,
            explanation: "`process.nextTick` is not technically part of the event loop; it processes the callback after the current operation completes but before the event loop continues. `setImmediate` is part of the check phase."
        },
        {
            id: "fs-16",
            question: "What is a Microservice Architecture?",
            options: [
                "A very small app",
                "An architectural style that structures an application as a collection of loosely coupled services",
                "A monolith",
                "A database design"
            ],
            correctAnswer: 1,
            explanation: "Microservices architecture is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms (often HTTP)."
        },
        {
            id: "fs-17",
            question: "What is Redis often used for?",
            options: [
                "Long-term storage",
                "Caching and session management (in-memory key-value store)",
                "Relational data",
                "Serving HTML"
            ],
            correctAnswer: 1,
            explanation: "Redis is an open source, in-memory data structure store, used as a database, cache, and message broker. It is extremely fast."
        },
        {
            id: "fs-18",
            question: "What is CSRF (Cross-Site Request Forgery)?",
            options: [
                "Stealing cookies",
                "An attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated",
                "A virus",
                "A phishing email"
            ],
            correctAnswer: 1,
            explanation: "CSRF is an attack where a malicious site tricks the user's browser into sending a request to a site where the user is authenticated (e.g., bank.com/transfer), using the user's cookies."
        },
        {
            id: "fs-19",
            question: "What is the purpose of Docker?",
            options: [
                "To manage databases",
                "To containerize applications (package code and dependencies together)",
                "To write code",
                "To monitor servers"
            ],
            correctAnswer: 1,
            explanation: "Docker is a platform for developing, shipping, and running applications in containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies."
        },
        {
            id: "fs-20",
            question: "What is CI/CD?",
            options: [
                "Computer Interface / Computer Design",
                "Continuous Integration / Continuous Deployment (or Delivery)",
                "Code In / Code Done",
                "A programming language"
            ],
            correctAnswer: 1,
            explanation: "CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development. CI is merging code changes; CD is releasing to production."
        }
    ]
};
