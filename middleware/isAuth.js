const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("/admin/login");
    }
};

// admin / moderator roli uchun
const roles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session.user.role)) {
            // res.status(401).json({ data: "Bu foydalanuvchi ushbu malumotni olish huquqiga ega emas" });
            res.redirect('/admin/login')
        }
        next();
    };
};

module.exports = {
    isAuth,
    roles
}