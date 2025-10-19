exports.updateProfile = async (req, res) => {
    try {
      const { name, skills, availability } = req.body;
      const user = await User.findById(req.user.id); // req.user set by auth middleware
      if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  
      user.name = name ?? user.name;
      user.skills = skills ?? user.skills;
      user.availability = availability ?? user.availability;
  
      await user.save();
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };