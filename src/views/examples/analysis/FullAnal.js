import React, { useState, useEffect } from "react";
import "./FullAnal.css";

function FullAnal() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    const handleButtonClick = (category) => {
        let newData = [];
        switch (category) {
            case "여유":
                newData = [
                    {
                        school: "목포대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "95",
                        category: "여유",
                    },
                    {
                        school: "순천대학교",
                        major: "전기공학과",
                        admissionProbability: "85",
                        category: "여유",
                    },
                    {
                        school: "조선대학교",
                        major: "화학공학과",
                        admissionProbability: "100",
                        category: "여유",
                    },
                    {
                        school: "군산대학교",
                        major: "기계공학과",
                        admissionProbability: "90",
                        category: "여유",
                    },
                    {
                        school: "목포대학교",
                        major: "융합소프트웨어학과",
                        admissionProbability: "87",
                        category: "여유",
                    },
                    {
                        school: "건양대학교",
                        major: "정보보안학과",
                        admissionProbability: "92",
                        category: "여유",
                    },
                    {
                        school: "순천대학교",
                        major: "토목공학과",
                        admissionProbability: "89",
                        category: "여유",
                    },
                    {
                        school: "순천대학교",
                        major: "에너지화학공학과",
                        admissionProbability: "97",
                        category: "여유",
                    },
                    {
                        school: "순천대학교",
                        major: "건축공학과",
                        admissionProbability: "86",
                        category: "여유",
                    },
                    {
                        school: "군산대학교",
                        major: "화학공학과",
                        admissionProbability: "88",
                        category: "여유",
                    },
                    {
                        school: "조선대학교",
                        major: "생명공학과",
                        admissionProbability: "91",
                        category: "여유",
                    },
                    {
                        school: "군산대학교",
                        major: "조선해양공학과",
                        admissionProbability: "98",
                        category: "여유",
                    },
                ];
                break;
            case "적절":
                newData = [
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    /*
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                    */
                ];
                break;
            case "도전":
                newData = [
                    {
                        school: "전남대학교",
                        major: "물리학과",
                        admissionProbability: "63",
                        category: "도전",
                    },
                    {
                        school: "부산대학교",
                        major: "영어학과",
                        admissionProbability: "45",
                        category: "도전",
                    },
                    {
                        school: "충남대학교",
                        major: "화학공학과",
                        admissionProbability: "57",
                        category: "도전",
                    },
                    {
                        school: "한국해양대학교",
                        major: "해양학과",
                        admissionProbability: "60",
                        category: "도전",
                    },
                    {
                        school: "강원대학교",
                        major: "산업공학과",
                        admissionProbability: "52",
                        category: "도전",
                    },
                ];
                break;
            case "위험":
                newData = [
                    {
                        school: "서울과학기술대학교",
                        major: "전자공학과",
                        admissionProbability: "25",
                        category: "위험",
                    },
                    {
                        school: "성균관대학교",
                        major: "법학과",
                        admissionProbability: "20",
                        category: "위험",
                    },
                    {
                        school: "한양대학교",
                        major: "경영학과",
                        admissionProbability: "15",
                        category: "위험",
                    },
                    {
                        school: "연세대학교",
                        major: "의학과",
                        admissionProbability: "22",
                        category: "위험",
                    },
                    {
                        school: "고려대학교",
                        major: "정치외교학과",
                        admissionProbability: "20",
                        category: "위험",
                    },
                    {
                        school: "이화여자대학교",
                        major: "교육학과",
                        admissionProbability: "10",
                        category: "위험",
                    },
                    {
                        school: "서강대학교",
                        major: "물리교육과",
                        admissionProbability: "1",
                        category: "위험",
                    },
                    {
                        school: "서울대학교",
                        major: "철학과",
                        admissionProbability: "5",
                        category: "위험",
                    },
                ];
                break;
            default:
                break;
        }
        // 합격률에 따라 내림차순 정렬
        newData.sort((a, b) => b.admissionProbability - a.admissionProbability);
        setData(newData);
        setCurrentPage(1); // 데이터가 변경될 때마다 첫 페이지로 초기화
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousButtonClick = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    };

    const handleNextButtonClick = () => {
        setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
    };

    const renderPageNumbers = () => {
        let startPage, endPage;
        if (totalPages <= 10) {
            // 전체 페이지가 10개 이하인 경우
            startPage = 1;
            endPage = totalPages;
        } else {
            // 현재 페이지가 5 이상인 경우, 앞으로 5개, 뒤로 5개의 페이지 번호를 표시
            if (currentPage <= 5) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 5;
            }
        }
    
        return (
            <div className="pageNumbers">
                {Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i).map(number => (
                    <span key={number} 
                        className={`pageNumber ${currentPage === number ? 'active' : ''}`}
                        onClick={() => handlePageClick(number)}
                        style={{ cursor: 'pointer', margin: '0 10px' }}>
                        {number}
                    </span>
                ))}
            </div>
        );
    };
    
    const startIndex = (currentPage - 1) * itemsPerPage;

    const getColorClass = (category) => {
        switch (category) {
            case "여유":
                return "blue";
            case "적절":
                return "lime";
            case "도전":
                return "orange";
            case "위험":
                return "red";
            default:
                return "";
        }
    };

    return (
        <div className="fullAnalLayout">
            <div className="contentLayout">
                {/* 성적 입력 칸 레이아웃 */}
                <div className="gradeInputContainer">
                    <span className="submitText">내 성적</span>
                    <input type="text" placeholder="내 등급" />
                </div>
                <div className="departmentInputContainer">
                    <span className="submitText">희망 학과</span>
                    <input type="text" placeholder="희망 학과" />
                </div>

                {/* 버튼 4개가 들어있는 컨테이너 */}
                <div className="buttonContainer">
                    <button className="categoryButton" onClick={() => handleButtonClick("여유")}>
                        여유
                    </button>
                    <button className="categoryButton" onClick={() => handleButtonClick("적절")}>
                        적절
                    </button>
                    <button className="categoryButton" onClick={() => handleButtonClick("도전")}>
                        도전
                    </button>
                    <button className="categoryButton" onClick={() => handleButtonClick("위험")}>
                        위험
                    </button>
                </div>
            </div>
            <div className="contentBelow">
                <div className="fourColumns">
                    {data.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
                        <div className="column" key={index}>
                            <div className={`box ${getColorClass(item.category)}`}>{item.school}</div>
                            <div className={`box ${getColorClass(item.category)}`}>{item.major}</div>
                            <div className="progressBarContainer">
                                <div className={`progressBar ${getColorClass(item.category)}`} style={{ width: `${item.admissionProbability}%` }}>
                                    <span className="progressText">{item.admissionProbability}%</span>
                                </div>
                            </div>
                            <div className={`box category-${getColorClass(item.category)}`}>{item.category}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 이전 버튼과 다음 버튼 사이에 페이지 수 표시 */}
            <div className="pagination">
                <button className="previousButton" onClick={handlePreviousButtonClick} disabled={currentPage === 1}>
                    &lt;
                </button>
                {renderPageNumbers()}
                <button className="nextButton" onClick={handleNextButtonClick} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default FullAnal;