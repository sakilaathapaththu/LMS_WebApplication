// utils/sanitizeUser.js
module.exports = function sanitizeUser(user) {
  return {
    id: user._id,
    fullName: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    birthday: user.birthday
    // ❌ Do not return: password, nic, createdAt, updatedAt, __v, etc.
  };
};
