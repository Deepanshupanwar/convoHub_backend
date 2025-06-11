exports.logout = async (req, res) => {
    try {
        res.status(200).clearCookie("convoHub", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        }).json({ message: "Logged out successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "server error" });
    }
}