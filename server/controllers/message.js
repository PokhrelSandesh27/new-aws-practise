const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const teacher = require('../middleware/teacher')

const { Message, validate, validateSearchMessage } = require('../models/message');
const { endsWith } = require('lodash');
const { User } = require('../models/user');

// std js with tab index of 4

// add async
exports.createMessage = async (req,res)=>{
    const { error, value: messageReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { sender: senderId, receiver : receiverId } = messageReq

    const sender = await User.findById(senderId)
    if (!sender) return res.status(400).send('Invalid Sender ID')
    const receiver = await User.findById(receiverId)
    if (!receiver) return res.status(400).send('Invalid Receiver ID')

    message= new Message(messageReq);
    await message.save()
    res.send(message)
};

exports.getAllMessages=async (req,res)=>{
    const messages=await Message.find().populate('sender receiver parent')
    res.send(messages);
};

exports.getMessageById=async (req,res)=>{
    const message=await Message.findById(req.params.id).populate('sender receiver parent')
    if(!message) return res.status(400).send("Message not found")
    res.send(message)
};
/*
exports.meeting_update=async (req,res)=>{
    const meetingReq=req.body
    //if (error) res.status(400).send(error.details[0].message)

    await Meeting.findByIdAndUpdate(req.params.id,{...meetingReq})
    updated_meeting=await Meeting.findById(req.params.id)
    res.send(updated_meeting)
}

exports.meeting_delete=async (req,res)=>{
    deleted_meeting = await Meeting.findByIdAndRemove(req.params.id)
    res.send(deleted_meeting)
}
*/
exports.searchMessages = async (req, res) => {
    const { error, value: searchReq } = validateSearchMessage(req.body)
    if (error) res.status(400).send(error.details[0].message)
    const {content} = searchReq
    if(content){
        messages=await Message.find({...searchReq,content:{ $regex: content, $options: 'i' }}).populate('receiver sender parent')
    }
    else{
        messages = await Message.find(searchReq).populate('receiver sender parent')
    }
    res.send(messages)
}