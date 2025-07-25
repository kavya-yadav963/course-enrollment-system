import { mockCourses, mockUsers, mockEnrollments } from './_mockData';
// Fetch all courses and enrich them with teacher names
export const getCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const coursesWithDetails = mockCourses.map(course => {
        const teacher = mockUsers.find(user => user.id === course.teacher_id);
        return { ...course, teacher_name: teacher ? teacher.name : 'Unassigned' };
      });
      resolve(coursesWithDetails);
    }, 500);
  });
};
export const getCourseById = (courseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = mockCourses.find(c => c.id === courseId);
      if (course) {
        const teacher = mockUsers.find(user => user.id === course.teacher_id);
        resolve({ ...course, teacher_name: teacher ? teacher.name : 'Unassigned' });
      } else {
        resolve(null); // Course not found
      }
    }, 500);
  });
};
export const getEnrolledStudents = (courseId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const studentIds = mockEnrollments
                .filter(e => e.course_id === courseId)
                .map(e => e.student_id);
            const students = mockUsers.filter(user => studentIds.includes(user.id));
            resolve(students);
        }, 500);
    });
};
// Add a student to a course
export const enrollStudent = (courseId, studentId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const course = mockCourses.find(c => c.id === courseId);
            const enrolledCount = mockEnrollments.filter(e => e.course_id === courseId).length;

            // --- Validation Logic ---
            if (enrolledCount >= course.max_students) {
                return reject({ message: 'Course is full. Cannot enroll more students.' });
            }
            const isAlreadyEnrolled = mockEnrollments.some(e => e.course_id === courseId && e.student_id === studentId);
            if (isAlreadyEnrolled) {
                return reject({ message: 'Student is already enrolled in this course.' });
            }

            mockEnrollments.push({ course_id: courseId, student_id: studentId });
            resolve({ success: true });
        }, 500);
    });
};

// Remove a student from a course
export const unenrollStudent = (courseId, studentId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockEnrollments.findIndex(e => e.course_id === courseId && e.student_id === studentId);
            if (index !== -1) {
                mockEnrollments.splice(index, 1);
            }
            resolve({ success: true });
        }, 500);
    });
};
// Add a new course
export const addCourse = (courseData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newCourse = {
                id: `course${Date.now()}`, // Create a unique ID
                ...courseData
            };
            mockCourses.push(newCourse);
            resolve(newCourse);
        }, 500);
    });
};

// Update an existing course
export const updateCourse = (courseId, updatedData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const courseIndex = mockCourses.findIndex(c => c.id === courseId);
            if (courseIndex !== -1) {
                mockCourses[courseIndex] = { ...mockCourses[courseIndex], ...updatedData };
                resolve(mockCourses[courseIndex]);
            }
        }, 500);
    });
};


// Delete a course
export const deleteCourse = (courseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockCourses.findIndex(c => c.id === courseId);
      if (index !== -1) {
        mockCourses.splice(index, 1);
      }
      resolve({ success: true });
    }, 500);
  });
};
export const getCoursesByTeacher = (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacherCourses = mockCourses.filter(course => course.teacher_id === teacherId);
      resolve(teacherCourses);
    }, 500);
  });
};
export const getStudents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const students = mockUsers.filter(user => user.role === 'Student');
            resolve(students);
        }, 500);
    });
};
export const getEnrolledCoursesByStudent = (studentId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const enrolledCourseIds = mockEnrollments
                .filter(e => e.student_id === studentId)
                .map(e => e.course_id);
            
            const enrolledCourses = mockCourses
                .filter(course => enrolledCourseIds.includes(course.id))
                .map(course => {
                    const teacher = mockUsers.find(user => user.id === course.teacher_id);
                    return { ...course, teacher_name: teacher ? teacher.name : 'Unassigned' };
                });
            resolve(enrolledCourses);
        }, 500);
    });
};