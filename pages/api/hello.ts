import withMiddleware from '../../util/withMiddleware'

export default async (req, res) => {
  await withMiddleware(req, res)
  return res.json({ message: '@pedox' })
}
