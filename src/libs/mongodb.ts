// src/libs/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

// 환경변수 체크
if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI 환경변수가 설정되지 않았습니다.')
}

let cachedConnection: typeof mongoose | null = null

export default async function connectMongoDB() {
  if (cachedConnection) return cachedConnection

  try {
    console.log('🌐 MongoDB 연결 시도...')
    cachedConnection = await mongoose.connect(MONGODB_URI!) // ← 여기 느낌표 해결
    console.log('✅ Connected to MongoDB')
    return cachedConnection
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error)
    cachedConnection = null
    throw error
  }
}
