import {Router} from "express";
import {getAllStats, getMainText, getComments} from '../services/serves.js'

const router = Router()

router.get('/api/1/stats', getAllStats)
router.get('/api/1/', getMainText)
router.post('/api/1/comments', getComments)

export default router
