export function validateEmailField(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateEmail(email) {
  const errors = [];

  if (!email) {
    errors.push('E-Mail не может быть пустым');
  } else if (!validateEmailField(email)) {
    errors.push('Невалидный адрес электронной почты');
  }

  return errors;
}

export function validatePassword(password) {
  const errors = [];

  if (password.length <= 0) {
    errors.push('Пароль не может быть пустым');
  } else {
    if (!isNaN(password)) {
      errors.push('Пароль должен быть строкой');
    } else {
      if (password.length < 4) {
        errors.push('Пароль не может быть короче 4 символов');
      }
      if (password.length > 12) {
        errors.push('Пароль не может быть длиннее 12 символов');
      }
    }
  }

  return errors;
}

export function validateConfirmPassword(confirmPassword, originalPassword) {
  const errors = [];

  if (confirmPassword.length <= 0) {
    errors.push('Пароль не может быть пустым');
  } else {
    if (!isNaN(confirmPassword)) {
      errors.push('Подтверждение пароля должно быть строкой');
    } else {
      if (
        originalPassword &&
        confirmPassword &&
        confirmPassword !== originalPassword
      ) {
        errors.push('Пароли не совпадают');
      }
    }
  }
  return errors;
}

export function validateNameNote(name) {
  const errors = [];

  if (name.length >= 100) {
    errors.push('Название не может быть длиннее 100 символов');
  }

  if (name.length <= 0) {
    errors.push('Заголовок не может быть пустым');
  }

  return errors;
}

export function validateTextarea(textarea) {
  const errors = [];
  if (textarea.length >= 500) {
    errors.push('Текст не может быть длиннее 500 символов');
  }

  if (textarea.length <= 0) {
    errors.push('Содержимое не может быть пустым');
  }

  return errors;
}
