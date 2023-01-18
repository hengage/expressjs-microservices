const axios = require('axios')

const createSMSUrl = (userNumber, username) => {
    const url = new URL(`https://www.bulksmsnigeria.com/api/v2/sms/create`);
    const params = {
        "api_token": process.env.BULKSMS_API_KEY,
        "to": userNumber,
        "from": "hengage",
        "body": `Your registration is successful, ${username}`,
        "gateway": "0",
        "append_sender": "0",
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}


const sendSMSPostRequest = async (url) => {
    try {
        const sendSMS = await axios.post(url);
        console.log({ sendSMS: sendSMS.data })
        return sendSMS;
    } catch (error) {
        if (error.response) {
            console.log({ errorResponse: error.response });
        } else if (error.request) {
            console.log({ errorRequest: error.request });
        } else {
            console.log({ errorrr });
        }
    }
}

const registerSuccessSMS = async (data) => {
    const { phoneNumber, username } = data.newUser;
    console.log({ data })
    console.log({ username })

    // use the user details to send the SMS
    const url = createSMSUrl(phoneNumber, username);
    const sendSMS = sendSMSPostRequest(url);
    return sendSMS;
}


module.exports = { registerSuccessSMS }