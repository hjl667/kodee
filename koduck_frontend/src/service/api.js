import httpService from './httpService'

export const userLoginPost = async (loginInfo) => {
    return await httpService.post('/api/token', loginInfo)
}

export const graphqlPost = async (query) => {
    return await httpService.post('/graphql', {
        query
    })
}

export const transcriptionPost = async (userId, data) => {
    return await httpService.post(`/api/transcription/${userId}`, data)
}

export const speechCreationPost = async (data) => {
    return await httpService.post('/api/initiate_speech_creation', data)
}

export const getUrlGet = async () => {
    return await httpService.get('/api/get_url')
}

export const validateTokenPost = async () => {
    return await httpService.post('/api/validate-token')
}

export const glossaryGet = async (prompt) => {
    return await httpService.post('/api/get_glossary', { prompt })
}

export const createAudioPost = async (speech, language) => {
    return await httpService.post('/api/create_audio', {speech, language})
}

// export const 