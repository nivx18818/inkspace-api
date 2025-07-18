const response = (req, res, next) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  };

  res.success = (status, data) => {
    if (status === 204) {
      return res.status(status).send();
    }

    return res.status(status ?? 200).json({
      success: true,
      data,
    });
  };

  res.token = (accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRATION, 10) || 3600000,
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION, 10) || 3369600000,
    });
    return res.success(204);
  };

  res.clearCookies = () => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    return res.success(204);
  };

  res.error = (status, message, err) => {
    if (err && process.env.NODE_ENV === "development") console.error(err);

    return res.status(status ?? 500).json({
      success: false,
      message: message ?? err?.toString(),
    });
  };

  next();
};

module.exports = response;
