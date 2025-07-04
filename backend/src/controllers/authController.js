const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.signup = async (req, res) => {
  try {
    const { name, role, email, cpf, password } = req.body;

    if (!email && !cpf) {
      return res.status(400).json({ error: 'Email or CPF is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      role: role || 'intern',
      email,
      cpf,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, cpf, password } = req.body;

    const whereClause = cpf ? { cpf } : { email };
    const user = await User.findOne({ where: whereClause });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       attributes: { exclude: ['password'] }
//     });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['name', 'role']
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ name: user.name, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};



exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
