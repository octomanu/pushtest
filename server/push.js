const fs = require('fs');
const VAPID = require('./vapid.json');
const webpush = require('web-push');
const urlsafeBase64 = require('urlsafe-base64');

const subscriptions = require('./subs-db.json');


webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    VAPID.publicKey,
    VAPID.privateKey
);
// obtengo la key publcia para buscar la subscripcion desde el front
module.exports.getKey = () => {
    return urlsafeBase64.decode(VAPID.publicKey);
};

// registro la subscripcion y la guardo. ya que son las personas a las quienes notificare.
module.exports.addSubscription = (subscription) => {
    subscriptions.push(subscription);
    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscriptions));
}

// envio una notificacion
module.exports.sendPush = (post) => {

    subscriptions.forEach((subsccripcion, i) => {

        webpush.sendNotification(subsccripcion, JSON.stringify(post));

    });




}