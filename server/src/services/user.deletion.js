function handleDeletion(dataSubjectId, locator, obj) {
    switch (locator.dataType) {
        case "user":
            return handleDeletionUser(dataSubjectId, locator, obj);
        case "document":
            return handleDeletionDocument(dataSubjectId, locator, obj);
        default:
            throw new Error("Invalid data type");
    }
}

function handleDeletionUser(dataSubjectId, locator, obj) {
    const docsToTraverse = obj.docIds.map(docId => {
        return {
            dataType: 'document',
            singleDocument: true,
            collectionPath: [...locator.collectionPath, "docs"],
            docIds: [...locator.docIds, docId]
        }
    });

    return {
        nodesToTraverse: [...docsToTraverse],
        deleteNode: true,
    };
}

function handleDeletionDocument(dataSubjectId, locator, obj) {
    return {
        nodesToTraverse: [],
        deleteNode: true,
    };
}

module.exports = handleDeletion;