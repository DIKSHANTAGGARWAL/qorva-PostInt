const AppDataSource = "../config";
const bcrypt = "bcrypt";
// const  * as jwt =  "jsonwebtoken";
const User = "../models/user";

const generateAccessToken = (user_id) => {
    const id = user_id;
    return jwt.sign({ id: id }, process.env.TOKEN_SECRET || "", {
        expiresIn: "2h",
    });
};



const login = async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
        where: { email: req.body.email },
    });

    if (!user) {
        return res.status(404).json({
            error: "User not found, Please Register.",
            status: "404"
        });
    } else {
        const matchPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!matchPassword) {
            return res.status(404).json({
                error: "Invalid Credentials",
                status: "404"
            });
        } else {
            const accessToken = generateAccessToken(user.user_id);
            res.status(200).json({
                status: "200",
                message: "User Logged In",
                accessToken: accessToken,
                // refreshToken: refreshToken,
            });
        }
    }
};

const register = async (req, res) => {
    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOne({
        where: { email: req.body.email },
    });

    if (user) {
        if (user.verified) {
            res.status(203).json({
                message: "User already Registered, Please Login to your account",
            });
        } else {
            res.status(202).json({
                message: "User already exist, please verify",
            });
        }

    } else {
        let user = { ...req.body };
        const hashedpassword = await bcrypt.hash(user.password, 12);
        user.password = hashedpassword;
        await userRepo.save(user);

        res.send({
            status: "verified",
            message: ({ message: "User Registered" })
        })
    }

}


exports.controller = {
    login,
    register
}

