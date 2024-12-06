import { loginUser } from '../services/auth';

export async function registerController(req, res) {
  const payload = {
    name: req.bode.name,
    email: req.bode.email,
    password: req.bode.password,
  };
  const registerUser = await registerUser(payload);
  res.send({
    status: 200,
    massage: 'User registered',
    data: registerUser,
  });
}
export async function loginController(req, res) {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Login successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}
