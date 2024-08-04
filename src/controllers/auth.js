export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(404).json({
        message: "Password is required",
      });
    }

    const user = {
      ...req.body,
    };

    res.json({
      user,
      message: "Work",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Произошла внутренняя ошибка. Повторите попытку позже.",
    });
  }
};
