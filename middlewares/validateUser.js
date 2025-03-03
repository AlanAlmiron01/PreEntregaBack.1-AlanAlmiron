export default (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ statusCode: 400, error: 'Missing required fields: email and password are required' });
  }
  next();
};
