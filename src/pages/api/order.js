import { firestore } from '../../firebase';
import firebase from 'firebase';
import validator from 'validator';
import { filterXSS } from 'xss';

export default async (req, res) => {
    try {
        const { body } = req;
        const { details, products } = body;

        const validatedDetails = validateDetails(details);
        const validatedProducts = validateProducts(products);

        const ordersRef = firestore.collection('orders');
        const created = await ordersRef.add({
            email: validatedDetails.email,
            details: validatedDetails,
            products: validatedProducts,
            datetime: firebase.firestore.FieldValue.serverTimestamp()
        });

        res.json({
            success: true
        });
    } catch (error) {
        res.status(500);
        res.json({ error: error.toString() });
    }
};

function validateProducts(products) {
    const result = [];

    if (!Array.isArray(products) || products.length === 0) {
        throw new Error('Products required!');
    }

    products.forEach((p, index) => {
        const result = Object.keys(p).reduce((xssFreeProduct, key) => {
            xssFreeProduct[key] = filterXSS(p[key]);
            return xssFreeProduct;
        }, {});

        if (!result.id) {
            // TODO validate firebase id
            throw new Error(`products[${index}] - Product id required!`);
        }

        if (!result.count) {
            throw new Error(`products[${index}] - Product count required!`);
        } else if (!validator.isNumeric(result.count)) {
            throw new Error(`products[${index}] - Product count is invalid!`);
        }

        if (!result.size) {
            throw new Error(`products[${index}] - Product size required!`);
        } else if (!validator.isAlpha(result.size)) {
            throw new Error(`products[${index}] - Product size is invalid!`);
        }
    });

    return result;
}

function validateDetails(details) {
    const result = Object.keys(details).reduce((xssFreeDetails, key) => {
        xssFreeDetails[key] = filterXSS(details[key]);
        return xssFreeDetails;
    }, {});

    if (!result) throw new Error('Details required!');

    if (validator.isEmpty(result.email)) throw new Error('Email required!');
    else if (!validator.isEmail(result.email)) {
        throw new Error('Email is wrong!');
    }

    if (validator.isEmpty(result.first))
        throw new Error('First Name required!');
    else if (!validator.matches(result.first, /^[a-zA-Z -]+$/i))
        throw new Error('First Name only "a-z","-"," " allowed!');
    else if (!validator.isLength(result.first, { min: 3, max: 50 }))
        throw new Error('First Name should be between 3 and 50 characters');

    if (validator.isEmpty(result.last)) throw new Error('Last Name required!');
    else if (!validator.matches(result.last, /^[a-zA-Z -]+$/i))
        throw new Error('Last Name only "a-z","-"," " allowed!');
    else if (!validator.isLength(result.last, { min: 3, max: 50 }))
        throw new Error('Last Name should be between 3 and 50 characters');

    if (validator.isEmpty(result.zip)) throw new Error('Zip required!');
    else if (!validator.isPostalCode(result.zip, 'any'))
        throw new Error('Invalid postal code');

    if (validator.isEmpty(result.state)) throw new Error('State required!');
    else if (
        !US_STATES.includes(
            validator.rtrim(validator.ltrim(result.state.toLowerCase()))
        )
    )
        throw new Error('State is wrong!');

    if (validator.isEmpty(result.city)) throw new Error('City required!');
    else if (!validator.isAlpha(result.city, 'en-US'))
        throw new Error('City only letters allowed!');
    else if (!validator.isLength(result.city, { min: 3, max: 100 }))
        throw new Error('City should be between 3 and 100 characters');

    if (validator.isEmpty(result.address)) throw new Error('Address required!');
    else if (!validator.isLength(result.address, { min: 3, max: 100 }))
        throw new Error('Address should be between 3 and 100 characters');
    else if (!validator.matches(result.address, /^[a-zA-Z, -]+$/i))
        throw new Error('Address is wrong!');

    return result;
}

const US_STATES = [
    'alabama',
    'alaska',
    'american samoa',
    'arizona',
    'arkansas',
    'california',
    'colorado',
    'connecticut',
    'delaware',
    'district of columbia',
    'federated states of micronesia',
    'florida',
    'georgia',
    'guam',
    'hawaii',
    'idaho',
    'illinois',
    'indiana',
    'iowa',
    'kansas',
    'kentucky',
    'louisiana',
    'maine',
    'marshall islands',
    'maryland',
    'massachusetts',
    'michigan',
    'minnesota',
    'mississippi',
    'missouri',
    'montana',
    'nebraska',
    'nevada',
    'new hampshire',
    'new jersey',
    'new mexico',
    'new york',
    'north carolina',
    'north dakota',
    'northern mariana islands',
    'ohio',
    'oklahoma',
    'oregon',
    'palau',
    'pennsylvania',
    'puerto rico',
    'rhode island',
    'south carolina',
    'south dakota',
    'tennessee',
    'texas',
    'utah',
    'vermont',
    'virgin island',
    'virginia',
    'washington',
    'west virginia',
    'wisconsin',
    'wyoming'
];
