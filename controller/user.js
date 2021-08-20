const USER = require('../module/user');


exports.create = async(req, res, next) => {
    const result = new USER({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,

    });
    result.save()
        .then(() => {
            res.redirect('/user/getAll')
                // res.json(result)
        })
        .catch((error) =>
            res.status(400).json({
                message: "xatolik bor malumot kiritilmadi?",
                data: error
            })
        );
};
exports.getAll = async(req, res, next) => {
    const result = await USER.find();
    res.render("./admin/user/index", {
        layout: "./admin",
        result
    });
    // res.json(result)
}

exports.getOne = async(req, res, next) => {
    const result = await USER.findById(req.params.id);
    res.render("./admin/user/update", {
        layout: "./admin",
        result,
    });
}



exports.updateOne = async(req, res, next) => {


    const result = await USER.findByIdAndUpdate(req.params.id);
    result.name = req.body.name;
    result.password = req.body.password;
    result.email = req.body.email;

    result
        .save()
        .then(() => {
            res.redirect('/user/getAll')
        })
        .catch(error => res.status(400).json({
            message: 'xato!',
            data: error
        }));
}

exports.Delete = async(req, res, next) => {
    await USER.findByIdAndDelete(req.params.id);
    res.redirect('/user/getAll')
}


exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.redirect("/admin/login");
    }
    const users = await USER.findOne({ email: email }).select("password");
    if (!users) {
        res.redirect("/admin/login");
    }
    const isMatch = await users.matchPassword(password);
    if (!isMatch) {
        res.redirect("/admin/login");
    }

    const body = await USER.findOne({ email: req.body.email });
    req.session.user = body;
    req.session.save();
    req.session.isAuth = true;
    res.redirect("/admin/dashboard");
};

exports.login_website = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json("News Error")
    }
    const users = await USER.findOne({ email: email }).select("password");
    if (!users) {
        res.json("News Error")
    }
    const isMatch = await users.matchPassword(password);
    if (!isMatch) {
        res.json("News Error")
    }

    const body = await USER.findOne({ email: req.body.email });
    req.session.client = body;
    req.session.save();
    res.status(200).json({ message: "Siz avtozrizaysiyadan o'tdingiz", data: body })
};


exports.logout = async(req, res, next) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/admin/login");
};

exports.logout_client = async(req, res, next) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/");
};