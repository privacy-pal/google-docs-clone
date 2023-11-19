import { FirestoreLocator } from "privacy-pal";


export default function handleAccess(dataSubjectId: string, locator: FirestoreLocator, obj: any): Record<string, any> {
    switch (locator.dataType) {
        case 'user':
            return handleAccessUser(dataSubjectId, locator, obj);
        default:
            throw new Error('Invalid data type');
    }
}

function handleAccessUser(dataSubjectId: string, locator: FirestoreLocator, obj: any): Record<string, any> {
    return {
        name: obj.name,
    };
}