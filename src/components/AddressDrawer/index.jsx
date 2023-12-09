import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { Drawer } from 'antd'
import React from 'react'
import { AddressCard, ListAddressCard } from '../AddressCard'
import { cn } from '@/utils'
import { Link } from 'react-router-dom'
import { PATH } from '@/config'

export const AddressDrawer = ({ onSelect, selected, open, onClose }) => {
    const { data, loading } = useQuery({
        queryFn: () => userService.getAddress(),
        onSuccess: (res) => {
            res?.data.sort(e => e.default ? -1 : 0)
        }
    })

    return (
        <Drawer width={470} open={open} onClose={onClose} headerStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }}>
            <div className="modal-content">
                {/* Close */}
                <button type="button" className="close !outline-none" data-dismiss="modal" aria-label="Close">
                    <i className="fe fe-x" aria-hidden="true" />
                </button>
                {/* Header*/}
                <div className="modal-header line-height-fixed font-size-lg">
                    <strong className="mx-auto">Select your address</strong>
                </div>
                {/* List group */}
                <div className="row list-group list-group-lg list-group-flush">
                    {
                        loading ? Array.from(Array(3)).map((_, i) => <AddressCard className="bg-white border-b !mb-0" key={i} loading />) :
                            data?.data?.map(e => <AddressCard
                                onClick={() => {
                                    onSelect(e)
                                    onClose()
                                }}
                                hideAction className={cn("bg-white border-b !mb-0 hover:!bg-[#eefff3] cursor-pointer", {
                                    '!bg-[#eefff3]': selected?._id === e._id
                                })} key={e._id} {...e} />)
                    }
                    {/* <ListAddressCard 
                        loading={loading}
                        loadingCount={3}
                        data={data?.data}
                        className="bg-white border-b !mb-0"
                    /> */}
                </div>
                {/* Buttons */}
                <div className="modal-body mt-auto">
                    <Link className="btn btn-block btn-outline-dark" to={PATH.Profile.NewAddress}>Thêm mới</Link>
                </div>
            </div>

        </Drawer>
    )
}
