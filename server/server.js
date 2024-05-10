import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/UserModel.js";
import Jobs from "./models/JobsModel.js"
import Company from "./models/CompanyModel.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.MONGODB_URI;

mongoose.connect(DB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ status: "authorized", accountType: user.accountType, userId: user._id });
                } else {
                    res.json("password incorrect");
                }
            } else {
                res.json("User doesn't exist");
            }
        })
        .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
    const { name, email, password, phone, companyName } = req.body;
    const accountType = companyName ? "hiring" : "seeker";

    User.create({ name, email, password, phone, accountType, companyName })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});


app.get('/', (req, res) => {
    Jobs.find({})
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

app.get('/companies', (req, res) => {
    User.find({ accountType: 'hiring' })
        .then(companies => res.json(companies))
        .catch(err => res.json(err))
})

app.post('/jobUpload', (req, res) => {
    const { title, jobType, salary, vacancies, experience, location,
        description, responsibilities, userId } = req.body;

    Jobs.create({
        createdBy: userId, title, jobType, salary, vacancies, experience, location,
        description, responsibilities
    })
        .then(jobs => res.json(jobs))
        .catch(err => res.json(err))
})

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json("User Not Found")
            }
        })
        .catch(err => res.json(err))
})

app.post('/userDetails', async (req, res) => {
    const {
        companyName,
        companyWebsite,
        employeeSize,
        companyType,
        companyLocation,
        companyFounded,
        companyDescription,
        userId
    } = req.body;

    const companyFields = {
        createdBy: userId,
        companyName,
        companyWebsite,
        employeeSize,
        companyType,
        companyLocation,
        companyFounded,
        companyDescription
    };

    try {
        const company = await Company.create(companyFields);
        res.json(company);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.post('/profileDetails', async (req, res) => {
    const {
        name,
        email,
        phone,
        degree,
        college,
        gender,
        DOB,
        aboutMe
    } = req.body;

    const userFields = {
        name,
        email,
        phone,
        degree,
        college,
        gender,
        DOB,
        aboutMe
    };

    try {
        const user = await User.create(userFields);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/userDetails', async (req, res) => {
    const userId = req.query.userId;
    try {
        const companies = await Company.find({ createdBy: userId });
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/profileDetails', async (req, res) => {
    const userId = req.query.userId;
    console.log('Received request for user ID:', userId);
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/appliedJobs', async (req, res) => {
    const userId = req.query.userId;
    console.log("applicant", userId)
    try {
        const jobs = await Jobs.find({ applicants: userId });
        console.log(jobs);
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ msg: 'No applied jobs found for the user' });
        }
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// app.get('/appliedJobs', async (req, res) => {
//     const userId = req.query.userId;
//     try {
//         const jobs = await Jobs.find({ applicants: { $in: [userId] } });
//         console.log(jobs);
//         if (!jobs || jobs.length === 0) {
//             return res.status(404).json({ msg: 'No applied jobs found for the user' });
//         }
//         res.json(jobs);
//     } catch (error) {
//         console.error('Error fetching applied jobs:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });







app.get('/applicant', async (req, res) => {
    const userId = req.query.userId;
    try {
        const applicant = await User.findById(userId);
        res.json(applicant);
    } catch (error) {
        console.error('Error fetching applicant:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/profileDetails/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { name, email, phone, degree, college, gender, DOB, aboutMe } = req.body;
    const updatedUser = { name, email, phone, degree, college, gender, DOB, aboutMe };
    try {
        const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        if (!user) {
            return res.status(404).json({ msg: 'User details not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


app.post('/apply/:jobId', async (req, res) => {
    const jobId = req.params.jobId;
    const userId = req.body.userId;;
    try {
        const job = await Jobs.findById(jobId);
        if (!job) {
            res.status(404).json({ msg: "Job not Found" })
        }
        job.applicants.push(userId);
        await job.save();
        res.json({ msg: "Applied Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error")
    }
});

app.get('/jobList', (req, res) => {
    const userId = req.query.userId;
    Jobs.find({ createdBy: userId })
        .then(jobList => res.json(jobList))
        .catch(err => res.json(err))
})

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
