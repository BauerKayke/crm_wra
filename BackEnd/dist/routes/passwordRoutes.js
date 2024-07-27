"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PasswordController = require('../controllers/PasswordController'); var _PasswordController2 = _interopRequireDefault(_PasswordController);

const router = _express.Router.call(void 0, );

// Rota para enviar o código de redefinição de senha
router.post('/forgotpassword', _PasswordController2.default.forgotPassword);

// Rota para verificar o código de redefinição de senha
router.post('/verify-code', _PasswordController2.default.verifyCode);

// Rota para redefinir a senha
router.post('/reset-password', _PasswordController2.default.resetPassword);

exports. default = router;
