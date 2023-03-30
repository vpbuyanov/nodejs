import {Router} from "express";
import {getAllStats, getMainText, getComments} from './services/serves.js'

const router = Router()

router.get('/', getMainText)
router.get('/stats', getAllStats)
router.post('/comments', getComments)

export default router
