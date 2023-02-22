const router = require('express').Router() ;

const userController = require('../controllers/user.controller')  ;
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware') ;

require('../middlewares/auth.middleware')(passport)

/**
 * rutas raiz
 *
 */

// router.get('/', passport.authenticate('jwt', {session: false}) ,userServices.getAllUsers )
router.get('/', userController.getAllUsers)

//? ruta de informacion propia del usuario logeado
router.route('/me')
    .get( passport.authenticate('jwt', {session: false}), 
        userController.getMyUser )
    .patch( passport.authenticate('jwt', {session: false}),
        userController.updateMyUser)
    .delete( passport.authenticate('jwt', {session: false}),
        userController.deletMyUser)

router.route('/:id')
    .get(userController.getUserById)

    .patch( passport.authenticate('jwt', {session: false}),
        adminValidate,
        userController.patchUser)

    .delete( passport.authenticate('jwt', {session: false}),
        adminValidate,
        userController.deleteUser)

module.exports = router