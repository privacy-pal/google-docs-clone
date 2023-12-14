const pal = require("../config/privacy");
const handleAccess = require("../services/user.privacy")
const handleDeletion = require("../services/user.deletion")

exports.deleteUserData = async (req, res) => {
    const mock = false;

    const dataSubjectLocator = {
        dataType: 'user',
        singleDocument: true,
        collectionPath: ['userDocs'],
        docIds: [req.params.id]
    }

    pal.processDeletionRequest(handleDeletion, dataSubjectLocator, req.params.id, !mock).then(() => {
        res.status(200).json({
            success: true,
        });
    }).catch((err) => {
        res.status(500).json({
            success: false,
        });
    });
}

exports.getUserData = async (req, res) => {
    const dataSubjectLocator = {
        dataType: 'user',
        singleDocument: true,
        collectionPath: ['userDocs'],
        docIds: [req.params.id]
    }

    const data = await pal.processAccessRequest(handleAccess, dataSubjectLocator, req.params.id)
    res.status(200).json({
        success: true,
        data: JSON.stringify(data)
    });
}