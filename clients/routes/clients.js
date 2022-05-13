const express = require('express');
const router = express.Router();
const Client = require('../models/clients');

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    });

    try {
        const savedClient = await client.save();
        res.status(201).json(savedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', getClient, (req, res) => {
    res.json(res.client);
});

router.patch('/:id', getClient, async (req, res) => {
    req.body.firstName && (res.client.firstName = req.body.firstName);
    req.body.lastName && (res.client.lastName = req.body.lastName);
    req.body.username && (res.client.username = req.body.username);
    req.body.email && (res.client.email = req.body.email);
    req.body.phoneNumber && (res.client.phoneNumber = req.body.phoneNumber);

    try {
        const updatedClient = await res.client.save();
        res.json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getClient, async (req, res) => {
    try {
        await res.client.remove();
        res.json({ message: 'Deleted client' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getClient(req, res, next) {
    let client;
    try {
        client = await Client.findById(req.params.id);
        if (client == null) {
            return res.status(404).json({ message: 'Client not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.client = client;
    next();
}

module.exports = router;