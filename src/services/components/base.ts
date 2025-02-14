import { BaseModel } from "@/models/BaseModel";
import { useUserStore } from "@/stores/user";
import { fetchWrapper } from "@/utils/fetch-wrapper";
import { Pagination } from "@/utils/patination";

export abstract class BaseService {

  public readonly _path: String;

  constructor (path: string) {
    this._path = path
  }

  setCreators (data) {
    const { user } = useUserStore()

    data.createdAt = new Date()
    data.createdBy = user.name
  }

  setUpdaters (data) {
    const { user } = useUserStore()

    data.updatedAt = new Date()
    data.updatedBy = user.name
  }

  post (data: any, lastPath?: string): Promise<any> {
    let path;

    this.setCreators(data)

    if (lastPath) {
      path = `${this._path}/${lastPath}`
    } else {
      path = `${this._path}`
    }
    return fetchWrapper.post(path, data)
  }

  putById (id: any, data?: any, lastPath?: string): Promise<any> {
    let path;

    if (lastPath) {
      path = `${this._path}/${id}/${lastPath}`
    } else {
      path = `${this._path}`
    }
    return fetchWrapper.put(path, data)
  }

  toggleStatus (id: any): Promise<any> {
    return fetchWrapper.put((`${this._path}/${id}/toggle-status`))
  }

  update (data: any): Promise<any> {
    this.setUpdaters(data)
    return fetchWrapper.put(this._path, data)
  }

  delete (id: string): Promise<any> {
    return fetchWrapper.delete(`${this._path}/${id}`)
  }

  deleteRange (data: Array<any>): Promise<any> {
    return fetchWrapper.delete(`${this._path}`, data)
  }

  get<T> (id: string, lastPath?: string): Promise<T> {
    let path;
    if (lastPath) {
      path = `${this._path}/${id}/${lastPath}`
    } else {
      path = `${this._path}/${id}`
    }
    return fetchWrapper.get(path)
  }

  getAll<T> (pageIdx?, pageSize?): Promise<Pagination<T>> {
    if (pageIdx && pageSize) {
      return fetchWrapper.get(`${this._path}?pageIndex=${pageIdx}&pageSize=${pageSize}`) as Promise<Pagination<T>>;
    }

    return fetchWrapper.get(this._path) as Promise<Pagination<T>>;
  }
}