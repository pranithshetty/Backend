//using promises
export const asyncHandler = (reqestHandler) => {
  return (req, res, next) => {
    Promise.resolve(reqestHandler(req, res, next)).catch((err) => next(err));
  };
};

//using try catch
// const asyncHandler = (reqestHandler) => async (req, res, next) => {
//   try {
//     await reqestHandler(req, res, next);
//   } catch (error) {
//     res.send(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
