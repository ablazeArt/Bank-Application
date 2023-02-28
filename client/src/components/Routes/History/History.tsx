import { Table, Tabs, Button } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";

interface ReceiveTransactions {
  action: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  remain: number;
  createdAt: string;
}

interface TransferTransactions {
  action: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  remain: number;
  createdAt: string;
}

const History: React.FC = () => {
  const { accountNumber: accountNumberParam } = useParams<{ accountNumber: string }>();

  const [receive, setReceive] = useState<ReceiveTransactions[]>([]);
  const [transfer, setTransfer] = useState<TransferTransactions[]>([]);
  const fetchData = () => {
    axios
      .get(`http://localhost:5000/account/${accountNumberParam}/history/receive`)
      .then((response) => {
        setReceive(response.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/account/${accountNumberParam}/history/transfer`)
      .then((response) => {
        setTransfer(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [accountNumberParam]);
  return (
    <div>
      <div className="flex text-white py-8">
        <Link to={`/account/${accountNumberParam}`}>
          <AiOutlineArrowLeft className="text-4xl" />
        </Link>
        <h1 className="text-2xl py-1 mx-auto">History</h1>
      </div>
      <Tabs.Group aria-label="Tabs with underline" style="underline" className="bg-slate-200">
        <Tabs.Item active={true} title="Receive">
          <Table hoverable={true} className="my-4">
            <Table.Head>
              <Table.HeadCell>Datetime</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Remain</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
              <Table.HeadCell>From</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {receive &&
                receive.map((receive: ReceiveTransactions, index: number) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{new Date(receive.createdAt).toLocaleString()}</Table.Cell>
                    <Table.Cell>{receive.toAccount}</Table.Cell>
                    <Table.Cell>{receive.remain}</Table.Cell>
                    <Table.Cell>{receive.action}</Table.Cell>
                    <Table.Cell>{receive.fromAccount}</Table.Cell>
                    <Table.Cell>{receive.amount}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Tabs.Item>
        <Tabs.Item title="Transfer">
          <Table hoverable={true} className="my-4">
            <Table.Head>
              <Table.HeadCell>Datetime</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Remain</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
              <Table.HeadCell>To</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {transfer &&
                transfer.map((transfer: TransferTransactions, index: number) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{new Date(transfer.createdAt).toLocaleString()}</Table.Cell>
                    <Table.Cell>{transfer.fromAccount}</Table.Cell>
                    <Table.Cell>{transfer.remain}</Table.Cell>
                    <Table.Cell>{transfer.action}</Table.Cell>
                    <Table.Cell>{transfer.toAccount}</Table.Cell>
                    <Table.Cell>{transfer.amount}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default History;
