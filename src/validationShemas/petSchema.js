import * as yup from 'yup';

import { dateRegexp } from '../helpers/regExpsHelpers';

const FILE_MAX_SIZE = 8388608;
const ACCEPTABLE_MIMETYPES = ['image/jpg', 'image/jpeg', 'image/png'];

const addPetSchema = yup.object({
  name: yup.string().min(2).max(16).required(),
  birthday: yup
    .string()
    .matches(dateRegexp, "birthdate must be a 'DD.MM.YYYY' format.")
    .required(),
  breed: yup.string().min(2).max(16).required(),
  petPhoto: yup
    .mixed()
    .test('FILE_SIZE', 'file must be less than 8 mb.', value =>
      value ? value.size < FILE_MAX_SIZE : true
    )
    .test(
      'MIME_TYPE',
      'file must be on of folowing formats: jpeg/jpg/png. ',
      value => (value ? ACCEPTABLE_MIMETYPES.includes(value.type) : true)
    ),
  comments: yup.string().min(8).max(120),
});

export default addPetSchema;