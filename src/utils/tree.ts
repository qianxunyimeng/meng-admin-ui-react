/**
 * 从Array数据构造Tree结构的数据
 * @param data 数组数据
 * @param idField id字段 默认 'id'
 * @param parentIdField parentId字段 默认 'parentId'
 * @param childrenField children字段 默认 'children'
 * @returns
 */
export const buildTreeFromArray = <T extends Record<string, any>>(
  data: Array<T>,
  idField = 'id',
  parentIdField = 'parentId',
  childrenField = 'children',
) => {
  const childrenListMap: Record<string, any> = {}
  const nodeIds: Record<string, any> = {}
  const tree = []
  for (const d of data) {
    const parentId = d[parentIdField]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[idField]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[parentIdField]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[idField]] !== null) {
      o[childrenField] = childrenListMap[o[idField]]
    }
    if (o[childrenField]) {
      for (const c of o[childrenField]) {
        adaptToChildrenList(c)
      }
    }
  }

  return tree
}
