const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https:\/\/i\.ibb\.co\.com\/.+/.test(v);
            }
        },
        message: props => `${props.value} is not a valid image URL. It must be from pexels.com or unsplash.com.`
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    statue: {
        type: String,
        enum: ['pending', 'published'],
        default: 'pending'
    },
    tags: {
        type: [String],
        default: ['uncategorized']
    },
    liked: {
        type: [String],
        default: []
    }
})


const Posts = mongoose.models.Post || mongoose.model('Post', PostSchema);

module.exports = Posts;