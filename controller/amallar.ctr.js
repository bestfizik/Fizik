const { read_file, write_file } = require("../fs/fileSystem");
const { v4 } = require("uuid")

const getAllAmallar = async (req, res) => {
    try {
        const AmalData = read_file("amallar.json")

        res.status(200).json(AmalData)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneAmal = async (req, res) => {
    try {
        const Amal = read_file("amallar.json")
        res.status(200).json({ Amal })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const addAmal = async (req, res) => {
    try {
        const { title } = req.body
        const AmalData = read_file("amallar.json")

        AmalData.push({
            id: v4(),
            title,
            userId: req.user.id
        })


        write_file("amallar.json", AmalData)
        res.status(201).json({ message: "Added new Amal" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const updateAmal = async (req, res) => {
    try {
        const { title } = req.body
        const AmalData = read_file("amallar.json")
        const foundedAmal = AmalData.find((item) => item.id === req.params.id)

        if (!foundedAmal) {
            return res.status(400).json({ message: "Amal not found" })
        }
        if (foundedAmal.userId !== req.user.id) {
            return res.status(403).json({ message: "Bu amalnin siz qo'shmagansiz" })
        }

        AmalData.forEach((item) => {
            if (item.id === req.params.id) {
                item.title = title ? title : item.title
            }
        })

        write_file("amallar.json", AmalData)
        res.status(200).json({ message: "Updated Amal" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteAmal = async (req, res) => {
    try {
        const AmalData = read_file("amallar.json")
        const foundedAmal = AmalData.find((item) => item.id === req.params.id)

        if (!foundedAmal) {
            return res.status(400).json({ message: "Amal not found" })
        }
        if (foundedAmal.userId !== req.user.id) {
            return res.status(403).json({ message: "Bu amalnin siz qo'shmagansiz" })
        }

        AmalData.forEach((item, idx) => {
            if (item.id === req.params.id) {
                AmalData.splice(idx, 1)
            }
        })

        write_file("amallar.json", AmalData)
        res.status(200).json({ message: "Deleted Amal" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    getAllAmallar,
    getOneAmal,
    addAmal,
    updateAmal,
    deleteAmal
}