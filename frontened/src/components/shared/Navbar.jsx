import React from "react";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/costatnt";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { AvatarFallback } from "@radix-ui/react-avatar";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCrenditials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-[]">
            Next<span className="text-[#F83002]">Hire</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center font-medium gap-5">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>
                    {" "}
                    <a
                      href="#"
                      className="text-black hover:text-[#F83002] transition-colors duration-400"
                    >
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/jobs"}>
                    <a
                      href="#"
                      className="text-black hover:text-[#F83002] transition-colors duration-300"
                    >
                      Jobs
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/browse"}>
                    {" "}
                    <a
                      href="#"
                      className="text-black hover:text-[#F83002] transition-colors duration-300"
                    >
                      Browse
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2 items-center">
              <Link to={"/login"}>
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#8751e4] hover:bg-[#6733c0] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONv6F3yMZ0UtElX1jD5g3QEOPEOkZngP0Cxf1zGhp429miUKkV17N5ebyAlESbhlJnFg&usqp=CAU"
                    }
                    alt="User Profile"
                  />
                  <AvatarFallback>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONv6F3yMZ0UtElX1jD5g3QEOPEOkZngP0Cxf1zGhp429miUKkV17N5ebyAlESbhlJnFg&usqp=CAU"
                      alt="Default Avatar"
                    />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONv6F3yMZ0UtElX1jD5g3QEOPEOkZngP0Cxf1zGhp429miUKkV17N5ebyAlESbhlJnFg&usqp=CAU"
                      }
                      alt="User Profile"
                    />
                    <AvatarFallback>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONv6F3yMZ0UtElX1jD5g3QEOPEOkZngP0Cxf1zGhp429miUKkV17N5ebyAlESbhlJnFg&usqp=CAU"
                        alt="Default Avatar"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 my-2">
                  {user && user.role == "student" && (
                    <div className="flex w-fit cursor-pointer items-center gap-2">
                      <User2 />
                      <Button variant="link">
                        <Link to={"/profile"}>View profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit cursor-pointer items-center gap-2">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
