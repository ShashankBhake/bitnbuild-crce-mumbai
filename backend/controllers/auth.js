export const logout = async (req,res) => {
    try {
        const { token } = req.body
        const userId = req.user.id
        for (let i of Object.keys(req.cookies)) {
            res.clearCookie(i)
        }
        return res.status(200).json({
            status: "success",
            message: "User logged out successfully",
        })
    } catch (error) {
        logger.error(error)
        return res.status(400).json({
            status: "error",
            message: "Something went wrong",
        })
    }
}


export const createSendTokenSql = async (user, statusCode, res, firstLogin) => {
    try {


        const token = signToken(user.id, user.role, user.avatar, user.updatedUsername, user.firstName);


        const cookieOptions = {
            expires: new Date(
                Date.now() + (parseInt(config.JWT_COOKIE_EXPIRES_IN)) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };


        res.cookie("jwt", token, cookieOptions);

        user.password = undefined;
        user.tokens = undefined;

        res.status(statusCode).json({
            status: "success",
            token,
            firstLogin,
            data: {
                user,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "error",
            error,
        });
    }
};



export const login = async (req, res) => {
    try {
        const { email , password } = req.body



        const user = await User.findOne({
            where: {
                email
            }
        })


        if (user) {
            logger.info("User already exists")

        } else {
            
            logger.info("User does not exist, creating new user")

            let newUsername = email.split("@")[0].toLowerCase();

            let ifUsernameExists = await User.findOne({
                where: {
                    userName: newUsername
                }
            })

            if (ifUsernameExists) {
                newUsername = newUsername + "-" + randomUUID().slice(4, 10)
                const newUser = User.create({
                    firstName: name,
                    email,
                    role: UserRole.STUDENT,
                    userName: newUsername,
                    emailVerified: email_verified,
                    avatar: picture,
                    provider: Provider.GOOGLE,
                    lastLoginDate: new Date(),
                })

                const nUser = await newUser.save()

                logger.info("New user created")
                createSendTokenSql(nUser, 201, res, true)
            } else {
                const newUser = User.create({
                    firstName: name,
                    email,
                    role: UserRole.STUDENT,
                    userName: newUsername,
                    emailVerified: email_verified,
                    avatar: picture,
                    provider: Provider.GOOGLE,
                    lastLoginDate: new Date(),
                })

                const nUser = await newUser.save()

                logger.info("New user created")
                createSendTokenSql(nUser, 201, res, true)
            }
        }
    } catch (error) {
        logger.error(error)
        res.status(400).json({
            status: "error",
            message: "Something went wrong",
        })
    }
}

