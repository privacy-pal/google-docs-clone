function handleAccess(dataSubjectId, locator, obj) {
    switch (locator.dataType) {
        case "user":
            return handleAccessUser(dataSubjectId, locator, obj);
        case "document":
            return handleAccessDocument(dataSubjectId, locator, obj);
        default:
            throw new Error("Invalid data type");
    }
}

function handleAccessUser(dataSubjectId, locator, obj) {
    return {
        account: obj.email,
        documents: obj.docIds.map(docId => {
            return {
                dataType: 'document',
                singleDocument: true,
                collectionPath: [...locator.collectionPath, "docs"],
                docIds: [...locator.docIds, docId]
            }
        })
    };
}

function handleAccessDocument(dataSubjectId, locator, obj) {
    const contentExists = obj.editorState && obj.editorState.blocks && obj.editorState.blocks.length > 0;

    const date = new Date(obj.timestamp._seconds * 1000);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    return {
        filename: obj.filename,
        createdTime: formattedDate,
        ...(contentExists ? {content: obj.editorState.blocks.map(block => block.text).join("\n")} : {})
    }
}

module.exports = handleAccess;