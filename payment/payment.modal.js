const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  clientSecret: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});


module.exports = mongoose.model('Payment', paymentSchema);






