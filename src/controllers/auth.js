// Register
export const register = async (req, res) => {
  try {
    res.json({
      message: "Work",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Произошла внутренняя ошибка. Повторите попытку позже.",
    });
  }
};
