import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import "./../list-fund-member/ListFund.scss";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";
const FundAdminDetail = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [fundDetail, setFundDetail] = useState({
    title: "Quỹ A",
    description: "Chi tiết quỹ A",
    tottal: 30000,
    listPay: [
      {
        name: "Xây nhà thờ",
        fund: "100000",
        time: "12-12-2024",
      },
      {
        name: "Xây nhà thờ",
        fund: "100000",
        time: "12-12-2024",
      },
      {
        name: "Xây nhà thờ",
        fund: "100000",
        time: "12-12-2024",
      },
      {
        name: "Xây nhà thờ",
        fund: "100000",
        time: "12-12-2024",
      },
    ],

    listMember: [
      {
        name: "Nguyễn Văn A",
        birthdate: "01/01/1990",
        email: "nguyenvana@example.com",
        address: "Hà Nội",
        gender: "Nam",
        fund: "100000",
      },
      {
        name: "Nguyễn Văn A",
        birthdate: "01/01/1990",
        email: "nguyenvana@example.com",
        address: "Hà Nội",
        gender: "Nam",
        fund: "100000",
      },
      {
        name: "Nguyễn Văn A",
        birthdate: "01/01/1990",
        email: "nguyenvana@example.com",
        address: "Hà Nội",
        gender: "Nam",
        fund: "100000",
      },
    ],
  });

  return (
    <div>
      <h4 className="bold" style={{ marginBottom: 20 }}>
        {fundDetail.title}
      </h4>

      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền dự tính</p>
        <p className="content">{fundDetail.tottal} VND</p>
      </Card>

      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền đã thu</p>
        <p className="content">{fundDetail.tottal} VND</p>
      </Card>

      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền đã chi</p>
        <p className="content">{fundDetail.tottal} VND</p>
      </Card>
      <Card className="funddetail-wrap">
        <p className="title bold">Nội dung</p>
        <p className="content">{fundDetail.description} VND</p>
      </Card>
      <Card className="funddetail-wrap vertical">
        <p className="bold">Danh sách đã chi</p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Tên công việc</TableCell>
                <TableCell className="text-center">Thời gian</TableCell>
                <TableCell className="text-center">Số tiền đã chi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fundDetail.listPay
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">{row.name}</TableCell>
                    <TableCell className="text-center">{row.time}</TableCell>

                    <TableCell className="text-center">{row.fund}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={fundDetail.listMember.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Card>
      <Card className="funddetail-wrap vertical">
        <p className="bold">Danh sách người góp quỹ</p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Tên</TableCell>
                <TableCell className="text-center">Email</TableCell>
                <TableCell className="text-center">Ngày sinh</TableCell>
                <TableCell className="text-center">Giới tính</TableCell>
                <TableCell className="text-center">Số tiền đóng góp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fundDetail.listMember
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">{row.name}</TableCell>
                    <TableCell className="text-center">{row.email}</TableCell>
                    <TableCell className="text-center">
                      {row.birthdate}
                    </TableCell>
                    <TableCell className="text-center">{row.gender}</TableCell>
                    <TableCell className="text-center">{row.fund}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={fundDetail.listMember.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Card>
     <div className="flex-start">
     <PrimaryButton title={"Lưu"} />
     </div>
    </div>
  );
};

export default FundAdminDetail;