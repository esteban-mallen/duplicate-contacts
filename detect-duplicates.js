const compareEmail = (contactA, contactB) => {
    const {email: emailA} = contactA;
    const {email: emailB} = contactB;

    if (emailA === emailB) {
        return 10; // Emails are the same, 100% chance of match
    }

    const emailUserA = emailA.split('@')[0];
    const emailUserB = emailB.split('@')[0];

    if (emailUserA === emailUserB) {
        return 5;
    }

    return 0;
}

const compareName = (contactA, contactB) => {
    const {name: contactAName, name1: contactAName1} = contactA;
    const {name: contactBName, name1: contactBName1} = contactB;

    if (contactAName === contactBName && contactAName1 === contactBName1) {
        return 5; // Names are the same, no need for extra checks. Higher chance of match.
    }

    if (contactAName === contactBName1 && contactAName1 === contactBName1) {
        return 5; // Names are the same but in different fields
    }

    let score = 0;

    if (contactAName && contactBName && contactAName === contactBName) {
        score += 1; // Name exact match
        if (contactAName1.startsWith(contactBName1[0]) || contactBName1.startsWith(contactAName1[0])) {
            score += 1; // Name1 starts with initial
        }
    }

    if (contactAName1 && contactBName1 && contactAName1 === contactBName1) {
        score += 1; // Name1 exact match
        if (contactAName.startsWith(contactBName[0]) || contactBName.startsWith(contactAName[0])) {
            score += 1; // Name starts with initial
        }
    }

    return score;
}

const compareAddress = (contactA, contactB) => {
    const {postalZip: zipA, address: addressA} = contactA;
    const {postalZip: zipB, address: addressB} = contactB;

    let score = 0;

    // Zip is present for both, and it's the same
    if (zipA && zipB && zipA === zipB) {
        score += 2;
    }

    // Address is present for both, and it's the same
    if (addressA && addressB && addressA === addressB) {
        score += 3;
    }

    return score;
}

const factors = [
    compareEmail,
    compareName,
    compareAddress,
]

const compareContacts = (contactA, contactB) => {
    return factors.reduce((score, factor) => score + factor(contactA, contactB), 0);
}

function detectDuplicates(contacts) {
    const matches = [
        ['ContactID Source', 'ContactID Match', 'Accuracy'] // Header row
    ];

    const duplicateContactIds = new Set();

    for (let i = 0; i < contacts.length; i++) {
        for (let j = i + 1; j < contacts.length; j++) {
            const contact1 = contacts[i];
            const contact2 = contacts[j];

            if (duplicateContactIds.has(contact2.contactID)) {
                continue // Already marked as possible duplicate of another contact
            }

            const score = compareContacts(contact1, contact2);

            // Only return records with score > 0 (potential duplicate)
            if (score > 0) {
                // Determine rank based on score
                let accuracy = 'Low';
                if (score >= 10) {
                    accuracy = 'High';
                } else if (score >= 5) {
                    accuracy = 'Medium';
                }

                matches.push([contact1.contactID, contact2.contactID, accuracy]);
                duplicateContactIds.add(contact2.contactID);
            }
        }
    }

    return matches;
}

exports.detectDuplicates = detectDuplicates;
