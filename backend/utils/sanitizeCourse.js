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
    visible: course.visible,
    createdAt: course.createdAt,
  };

  if (options.includeIsApproved !== undefined) {
    base.isApproved = options.includeIsApproved;
  }

  if (options.includeSensitive) {
    base.enrollmentKey = course.enrollmentKey;
    base.videoClips = course.videoClips;
    base.prerequisites = course.prerequisites;
  }

  return base;
};
