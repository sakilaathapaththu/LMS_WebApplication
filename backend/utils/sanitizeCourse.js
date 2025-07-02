// utils/sanitizeCourse.js
module.exports = function sanitizeCourse(course, options = {}) {
  const base = {
    _id: course._id,
    courseId: course.courseId,
    title: course.title,
    description: course.description,
    coverImage: course.coverImage,
    category: course.category,
    conductorName: course.conductorName,
    duration: course.duration,
    level: course.level,
    createdAt: course.createdAt
  };

  // Optional flag to include `isApproved`
  if (options.includeIsApproved !== undefined) {
    base.isApproved = options.includeIsApproved;
  }

  return base;
};

