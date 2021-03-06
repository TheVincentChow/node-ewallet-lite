const mongoose = require('mongoose');
const uniqueString = require('unique-string');
const { TRANSACTION_TYPE } = require('../utils/constants/transaction');

const transactionSchema = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            unique: true,
            immutable: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        amount: {
            type: Number,
            required: true,
            min: 0.1
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(TRANSACTION_TYPE)
        },
        typeDetail: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        direction: {
            type: String,
            required: true
        },
        mid: {
            type: String,
            immutable: true
        }
    },
    { timestamps: true }
);

transactionSchema.pre('save', async function(next) {
    const transaction = this;
    if (transaction.isNew) {
        transaction.transactionId = uniqueString();
    }
    next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
