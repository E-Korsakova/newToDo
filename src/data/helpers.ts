type GenerateId = () => string;
const generateId: GenerateId = () => Math.random().toString(16).slice(2) + new Date().getTime().toString(36);
export default generateId;
