const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid email')
        },
        lowercase: true

    },
    mobileNo: [{
        No: {
            type: String,
            trim: true,
            validate(value) {
                if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('not egypt number')
            }
        }

    }],
    password: {
        type: String,
        trim: true,
        match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        required: true
    },
    livedIn: {
        hometown: {
            city: {
                type: String,
                trim: true,
                lowercase: true
            },
            coutry: {
                type: String,
                trim: true,
                lowercase: true
            }
        },
        currenttown: {
            city: {
                type: String,
                trim: true,
                lowercase: true

            },
            country: {
                type: String,
                trim: true,
                lowercase: true,
            }
        }
    },
    BirthDate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        required: true

    },
    profileImage: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },

    work: [{
        workPlace: {
            type: String

        },
        position: {
            type: String

        },
        description: {
            type: String
        },
        city: {
            type: String,
            trim: true,
            lowercase: true

        },
        periodFrom: {
            type: Date
        },
        periodTo: {
            type: Date,
            default: Date.now()
        }
    }],
    college: {
        nameofCollege: {
            type: String

        },
        University: {
            type: String

        },
        department: {
            type: String

        },
        status: {
            type: Boolean,
            default: true //graduated =>true

        },
        degree: {
            type: String

        },
        periodFrom: {
            type: Date
        },
        periodTo: {
            type: Date,
            default: Date.now()

        },
        description: {
            type: String
        }
    },
    websiteslinks: [{
        type: {
            type: String,
            enum: ['LinkdIn', 'Instagram', 'SoundCloud', 'Twitter', 'Ask.fm', 'Sarahah']
        },
        link: {
            type: String,
            validate(value) {
                if (!validator.isURL(value)) throw new Error('invalid Url')
            }
        }
    }],
    friends: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }

    ],
    friendRequests: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: ['accept', 'remove', 'suspend'],
            default: 'suspend'
        }
    }],
    RequestsSent: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String
        }
    }],
    tokens: [{
        token: {
            type: String,



            required: true
        }
    }]
}, { timestamps: true })

userSchema.virtual('myPosts', {
    ref: "Post",
    localField: "_id",
    foreignField: "userId"
})

userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}
userSchema.pre('save', async function() {
        const user = this
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 12)
        }
    })
    // findByCredentials 
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('invalid email')
    const isvalid = await bcrypt.compare(password, user.password)
    if (!isvalid) throw new Error('invalid password')
    return user
}
token = "";
jwt = require('jsonwebtoken')
userSchema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWTKEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}
const User = mongoose.model('User', userSchema)

module.exports = User