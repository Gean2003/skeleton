const userServices = require('../services/user.services')

const getAllUsers =  (req, res) => {
    userServices.getAllUsers()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    
};

const getUserById = (req, res) => {
    const id = req.params.id ;

    userServices.getUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
    
} ;

const patchUser = (req, res) => {
    const id = req.params.id;
        
    const {firstName, lastName, phone, birthday, gender, country} = req.body ;

    userServices.updateUser(id, {firstName, lastName, phone, birthday, gender, country})
        .then(data => {
            if (data[0]) {
                res.status(200).json({message: `user with ID: ${id} edited succesfully`})
                
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
};

const deleteUser = (req, res) => {
    const id = req.params.id ;
    userServices.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(204).json()
                
            } else {
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})

        })
    
};

const registerUser =  (req, res) => {
    const {firstName, lastName, email, password, phone, birthday, gender, country, dni } = req.body;

    if (
        firstName &&
        lastName &&
        email &&
        password &&
        phone &&
        birthday &&
        dni
    ) {
        //? Ejecutamos el controller
        userServices.createUser({
            firstName, lastName, email, password, phone, birthday, gender, country, dni
        })
            .then( data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    } else {
    //? Error cuando no mandan todos los datos necesarios para crear un usuario
        res.status(400).json({message: 'All fields must be completed', fields: {
            firstName: 'string',
            lastName: 'string',
            email: 'example@example.com',
            dni: 'xxxxxxxx',
            password: 'string',
            phone: '+521231231231',
            birthday: 'YYYY/MM/DD'
        }})
    }
    
};

//? My user services

const getMyUser = (req, res) => {
      const id = req.user.id ; // req.user contiene la informacion del token desencriptado 
        userServices.getUserById(id)
        .then( data => {
                res.status(200).json(data)
        } )
        .catch(err => {
            res.status(400).json({message: err.message})
        })
};

const updateMyUser = (req, res) => {
    const id = req.user.id;
    const {firstName, lastName, phone, birthday, gender, country} = req.body ;

     userServices.updateUser(id, {firstName, lastName, phone, birthday, gender, country})
        .then(data => {
            if (data[0]) {
                res.status(200).json({message: `user with ID: ${id} edited succesfully`})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    
} ;

const deletMyUser = (req, res) => {
    const id = req.user.id ;
    userServices.updateUser(id, {status: 'Inactive'})
        .then( () => {
            res.status(200).json({message: 'Your user was deletd succesfully'})
        } )
        .catch( err => {
            res.status(400).json({message: err.message})
        } )
        
} ;

module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser,
    updateMyUser,
    deletMyUser
}