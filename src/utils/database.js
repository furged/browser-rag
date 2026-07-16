const DB_NAME = "BrowserRAG";
const DB_VERSION = 3;

export async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION); // This is a promise, a promise represents a value we dont have yet but it sure will be there after some time
        
        request.onerror = () => {
            reject(request.error);
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains("documents")) {
                db.createObjectStore("documents", {
                    keyPath: "id",
                });
            }

            let chunkStore;

            if (!db.objectStoreNames.contains("chunks")) {
                chunkStore = db.createObjectStore("chunks", {
                    keyPath: "id",
                });
            } else {
                chunkStore = event.target.transaction.objectStore("chunks");
            }

            if (!chunkStore.indexNames.contains("documentId")) {
                chunkStore.createIndex("documentId", "documentId", {
                    unique: false,
                });
            }
        };
    });
}

export async function saveChunks(chunks) {
    const db = await openDatabase();
    const transaction = db.transaction("chunks", "readwrite");
    const store = transaction.objectStore("chunks");
    for (const chunk of chunks) {
        store.put(chunk);
    }
    await new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();

        transaction.onerror = () => reject(transaction.error);

        transaction.onabort = () => reject(transaction.error);
    });
}

export async function loadChunks(documentId) {
    const db = await openDatabase();

    const transaction = db.transaction("chunks", "readonly");
    const store = transaction.objectStore("chunks");

    const index = store.index("documentId");

    const request = index.getAll(IDBKeyRange.only(documentId));

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function clearChunks() {
    const db = await openDatabase();
    const transaction = db.transaction("chunks", "readwrite");
    const store = transaction.objectStore("chunks");
    const request = store.clear();
    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(request.error);
        };
    });

}

export async function saveDocument(document) {
    const db = await openDatabase();

    const transaction = db.transaction("documents", "readwrite");

    const store = transaction.objectStore("documents");

    store.put(document);

    await new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();

        transaction.onerror = () => reject(transaction.error);

        transaction.onabort = () => reject(transaction.error);
    });
}

export async function loadDocuments() {
    const db = await openDatabase();

    const transaction = db.transaction("documents", "readonly");

    const store = transaction.objectStore("documents");

    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function deleteDocument(documentId) {
    const db = await openDatabase();

    const transaction = db.transaction("documents", "readwrite");
    const store = transaction.objectStore("documents");

    const request = store.delete(documentId);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();

        request.onerror = () => reject(request.error);
    });
}

export async function deleteChunks(documentId) {
    const db = await openDatabase();

    const transaction = db.transaction("chunks", "readwrite");
    const store = transaction.objectStore("chunks");

    const index = store.index("documentId");

    const request = index.getAll(
        IDBKeyRange.only(documentId)
    );

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            const chunks = request.result;

            for (const chunk of chunks) {
                store.delete(chunk.id);
            }
        };

        request.onerror = () => reject(request.error);

        transaction.oncomplete = () => resolve();

        transaction.onerror = () => reject(transaction.error);

        transaction.onabort = () => reject(transaction.error);
    });
}